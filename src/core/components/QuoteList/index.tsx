import { FC, Fragment } from "react";
import { Box, List, Typography } from "@mui/material";
import EmptyItem, { EmptyItemPropsType } from "./EmptyItem";
import QuoteItem, { QuoteItemPropsType } from "./QuoteItem";
import QuoteTitle from "./QuoteTittle";
import { SearchOffRounded } from "@mui/icons-material";

export type QuoteListType = { title: string; items: QuoteItemPropsType[] };

export type QuoteListPropsType = EmptyItemPropsType & {
  items: QuoteListType[];
  onClickItem: (item: any) => void;
  onSelect?: (item: QuoteItemPropsType) => boolean;
  highlightText?: string;
  emptyMessage?: string;
  noresultsMessage?: string;
};

export const QuoteList: FC<QuoteListPropsType> = ({
  emptyMessage,
  highlightText,
  items,
  onClickAdd,
  onClickItem,
  noresultsMessage,
  onSelect,
}) => {
  return (
    <List
      sx={(theme) => ({
        paddingTop: 0,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
      })}
    >
      {!items.length && !noresultsMessage && (
        <EmptyItem
          key={"EmptyItem"}
          onClickAdd={onClickAdd}
          emptyMessage={emptyMessage}
        />
      )}
      {!items.length && noresultsMessage && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <SearchOffRounded
            fontSize="large"
            sx={(theme) => ({
              marginBottom: theme.spacing(0.5),
              color: theme.palette.text.secondary,
            })}
          />
          <Typography variant="body1" color={"text.secondary"}>
            No quotes matching
          </Typography>
          <Typography variant="subtitle1" color={"text.primary"}>
            {`"${noresultsMessage}"`}
          </Typography>
        </Box>
      )}
      {items.map((item, index) => (
        <Fragment key={`${item.title}-${index}`}>
          <QuoteTitle text={item.title} topSpacing={index != 0} />
          {item.items.map((card, cardIndex) => (
            <QuoteItem
              key={`${item.title}-${card.title}-${cardIndex}`}
              title={card.title}
              subTitle={card.subTitle}
              date={card.date}
              onClick={() => onClickItem(card)}
              highlightText={highlightText}
              selected={onSelect && onSelect(card)}
            />
          ))}
        </Fragment>
      ))}
    </List>
  );
};

export default QuoteList;
