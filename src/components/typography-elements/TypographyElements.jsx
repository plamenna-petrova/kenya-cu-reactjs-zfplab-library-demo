/* eslint-disable react/prop-types */
import { Box, styled } from "@mui/material";
import clsx from "clsx";

const TypographyStyledBox = styled(Box)(({ ellipsis }) => ({
  textTransform: "none",
  ...(ellipsis && { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" })
}));

export const H1 = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <TypographyStyledBox
      mb={0}
      mt={0}
      component="h1"
      fontSize="28px"
      fontWeight="500"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}>
      {children}
    </TypographyStyledBox>
  );
};

export const H2 = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <TypographyStyledBox
      mb={0}
      mt={0}
      component="h2"
      fontSize="24px"
      fontWeight="500"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}>
      {children}
    </TypographyStyledBox>
  );
};

export const H3 = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <TypographyStyledBox
      mb={0}
      mt={0}
      component="h3"
      fontSize="20px"
      fontWeight="500"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}>
      {children}
    </TypographyStyledBox>
  );
};

export const H4 = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <TypographyStyledBox
      mb={0}
      mt={0}
      component="h4"
      fontSize="16px"
      fontWeight="500"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}>
      {children}
    </TypographyStyledBox>
  );
};

export const H5 = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <TypographyStyledBox
      mb={0}
      mt={0}
      component="h5"
      fontSize="14px"
      fontWeight="500"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}>
      {children}
    </TypographyStyledBox>
  );
};

export const H6 = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <TypographyStyledBox
      mb={0}
      mt={0}
      component="h6"
      fontSize="13px"
      fontWeight="500"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}>
      {children}
    </TypographyStyledBox>
  );
};

export const Paragraph = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <TypographyStyledBox
      mb={0}
      mt={0}
      component="p"
      fontSize="14px"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}>
      {children}
    </TypographyStyledBox>
  );
};

export const Small = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <TypographyStyledBox
      fontSize="12px"
      fontWeight="500"
      lineHeight="1.5"
      component="small"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}>
      {children}
    </TypographyStyledBox>
  );
};

export const Span = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <TypographyStyledBox
      component="span"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}>
      {children}
    </TypographyStyledBox>
  );
};

export const Tiny = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <TypographyStyledBox
      fontSize="10px"
      lineHeight="1.5"
      component="small"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}>
      {children}
    </TypographyStyledBox>
  );
};