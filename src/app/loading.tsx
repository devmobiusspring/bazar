"use client";
import { Box } from "@mui/material";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";

const Loading = () => {
  return (
    <Box sx={{ p: 2 }}>
      <LoadingSkeleton variant="product-card" count={6} />
    </Box>
  );
};

export default Loading;
