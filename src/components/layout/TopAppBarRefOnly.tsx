import React, { ReactNode, useEffect, useRef, useState } from 'react'
import * as styles from './Navbar.css'
import { cx } from '@paypalcorp/pp-react-utils'
import { Button, CaptionText, HeadingText, IconButton } from '@paypalcorp/pp-react'

// Base interface for all action types
interface BaseNavbarAction {
  label: string
  className?: string
  onClick?: () => void
  btnState?: 'initial' | 'processing' | 'success' | 'error'
  [key: string]: any  // Allow for any additional props
}

// Specific action type for IconButton
interface IconButtonAction extends BaseNavbarAction {
  type: 'IconButton'
  svgIconComponent: React.ComponentType<any>
}

// Specific action type for Button
interface ButtonAction extends BaseNavbarAction {
  type: 'Button'
  // svgIconComponent is not required for Button
}

// Union type for all supported action types
type NavbarAction = IconButtonAction | ButtonAction

interface NavbarProps {
  /** Title that appears both large (top) and small (inline) */
  title?: string
  /** Id of the element that scrolls (defaults to document) */
  scrollContainerId?: string
  /** Optional leading element (e.g. back arrow) */
  leadingActions?: (IconButtonAction | ButtonAction)[]
  /** Optional trailing element (e.g. menu dots) */
  trailingActions?: (IconButtonAction | ButtonAction)[]
  /** Optional classes to add to the container */
  classes?: string
}

const Navbar = ({
  title,
  scrollContainerId,
  leadingActions,
  trailingActions,
  classes
}: NavbarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  // Use IntersectionObserver to create iOS-style collapsing header effect
  useEffect(() => {
    // Get the element to use as root for the observer
    const rootElement = scrollContainerId 
      ? document.getElementById(scrollContainerId) 
      : null
    
    // Create observer that watches when our sentinel element is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCollapsed(!entry.isIntersecting)
      },
      { 
        root: rootElement, 
        threshold: 0 
      }
    )
    
    // Start observing our sentinel element
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }
    
    // Clean up the observer when component unmounts
    return () => observer.disconnect()
  }, [scrollContainerId])

  const renderAction = (action: NavbarAction, i: any) => {
    const { type, label, className, ...actionProps } = action
    
    if (type === 'IconButton') {
      return (
        <IconButton
          key={i}
          buttonType="secondary"
          size="sm"
          className={cx(styles.iconButton, className)}
          {...actionProps}
        >
          {label}
        </IconButton>
      )
    }

    if (type === 'Button') {
      return (
        <Button
          key={i}
          variant="primary"
          size="sm"
          className={cx(styles.button, className)}
          {...actionProps}
        >
          {label}
        </Button>
      )
    }

    return null
  }

  return (
    <>
      {/* Controls bar with leading/trailing elements */}
      <nav className={cx(styles.navbar, collapsed && styles.navbarCollapsed, classes)}>
        {/* Leading buttons (left side) */}
        <div className={styles.actionContainer}>
          {leadingActions?.map(renderAction)}
        </div>
        
        {/* Small title only appears when scrolled/collapsed */}
        {title && collapsed && (
          <CaptionText className={styles.smallTitle}>
            {title}
          </CaptionText>
        )}
        
        {/* Trailing buttons (right side) */}
        <div className={styles.actionContainer}>
          {trailingActions?.map(renderAction)}
        </div>
      </nav>
      {/* Large title */}
      {title && (
        <div className={styles.largeTitleContainer}>
          <HeadingText size="lg">{title}</HeadingText>
        </div>
      )}

      {/* Invisible sentinel to detect scroll position */}
      <div ref={sentinelRef} style={{ height: 0 }} />
    </>
  )
}

export default Navbar