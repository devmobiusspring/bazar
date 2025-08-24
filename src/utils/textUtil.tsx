export const highlightWords = (
  text: string,
  highlight: string,
  color: string
) => {
  if (!highlight) return text;

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} style={{ color }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};
