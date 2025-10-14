export const navigation = {
  className: "navigation",
  base: {
    padding: "1rem",
    marginBottom: "2rem",

    '& [data-scope="segment-group"][data-part="root"]': {
      display: "flex",
      position: "relative",
      backgroundColor: "slate.100", // Use token instead of #f1f5f9
      borderRadius: "8px",
      padding: "4px",
      width: "fit-content",
      margin: "0 auto",
    },

    '& [data-scope="segment-group"][data-part="item"]': {
      position: "relative",
      zIndex: 1,
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      background: "transparent",
      border: "none",
      fontSize: "14px",
      fontWeight: 500,
      color: "slate.500", // Use token instead of #64748b
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "120px",

      "&:hover": {
        color: "slate.700", // Use token instead of #334155
      },

      '&[data-state="checked"]': {
        color: "red",
        fontWeight: 600,
      },
    },

    '& [data-scope="segment-group"][data-part="indicator"]': {
      position: "absolute",
      backgroundColor: "white",
      borderRadius: "6px",
      boxShadow: "sm", // Use token instead of hardcoded shadow
      transition: "all 0.2s ease",
      zIndex: 0,
    },

    '& [data-scope="segment-group"][data-part="item"] a': {
      color: "inherit",
      textDecoration: "none",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
};