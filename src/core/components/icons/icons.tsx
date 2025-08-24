import { ReactNode, cloneElement } from "react";
import BedRounded from "@mui/icons-material/BedRounded";
import WcRounded from "@mui/icons-material/WcRounded";
import KitchenRounded from "@mui/icons-material/KitchenRounded";
import ChairRounded from "@mui/icons-material/ChairRounded";
import TableRestaurantRounded from "@mui/icons-material/TableRestaurantRounded";
import WarehouseRounded from "@mui/icons-material/WarehouseRounded";
import GarageRounded from "@mui/icons-material/GarageRounded";
import HouseIcon from "@mui/icons-material/House";
import { ImageRounded } from "@mui/icons-material";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";

export interface IconMap {
  [key: string]: ReactNode;
}

export const icons: IconMap = {
  mainBedroom: <BedRounded />,
  mainBathroom: <WcRounded />,
  secondaryRoom: <BedRounded />,
  secondaryBathroom: <WcRounded />,
  kitchen: <KitchenRounded />,
  livingRoom: <ChairRounded />,
  diningRoom: <TableRestaurantRounded />,
  warehouse: <WarehouseRounded />,
  garage: <GarageRounded />,
  house: <HouseIcon />,
  front: <ArrowCircleUpRoundedIcon />,
  back: <ArrowCircleDownRoundedIcon />,
  left: <ArrowCircleLeftRoundedIcon />,
  right: <ArrowCircleRightRoundedIcon />,
  default: <ImageRounded />,
};

export const returnIconFromType = (iconType: string, props?: any) => {
  const icon = icons?.[iconType] ?? icons["default"];
  if (props) {
    return cloneElement(icon as React.ReactElement<any>, props);
  }
  return icon;
};

export const ConvertIconToReactNode = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return children;
};
