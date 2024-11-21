import { FC, ComponentProps, ElementType } from "react";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from '@mui/material/Box';
import clsx from "clsx";

interface StyledBoxProps extends BoxProps {
  ellipsis?: boolean;
}

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "ellipsis"
})<StyledBoxProps>(({ ellipsis }) => ({
  textTransform: "none",
  ...(ellipsis && { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }),
}));

interface TypographyProps extends ComponentProps<typeof StyledBox> {
  ellipsis?: boolean;
  component?: ElementType;
}

export const H1: FC<TypographyProps> = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <StyledBox
      mb={0}
      mt={0}
      component="h1"
      fontSize="28px"
      fontWeight="500"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx(className)}
      {...restProps}
    >
      {children}
    </StyledBox>
  );
};

export const H2: FC<TypographyProps> = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <StyledBox
      mb={0}
      mt={0}
      component="h2"
      fontSize="24px"
      fontWeight="500"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}
    >
      {children}
    </StyledBox>
  );
};

export const H3: FC<TypographyProps> = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <StyledBox
      mb={0}
      mt={0}
      component="h3"
      fontSize="18px"
      fontWeight="500"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}
    >
      {children}
    </StyledBox>
  );
};

export const H4: FC<TypographyProps> = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <StyledBox
      mb={0}
      mt={0}
      component="h4"
      fontSize="16px"
      fontWeight="500"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}
    >
      {children}
    </StyledBox>
  );
};

export const H5: FC<TypographyProps> = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <StyledBox
      mb={0}
      mt={0}
      component="h5"
      fontSize="14px"
      fontWeight="500"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}
    >
      {children}
    </StyledBox>
  );
};

export const H6: FC<TypographyProps> = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <StyledBox
      mb={0}
      mt={0}
      component="h6"
      fontSize="13px"
      fontWeight="500"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}
    >
      {children}
    </StyledBox>
  );
};

export const Paragraph: FC<TypographyProps> = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <StyledBox
      mb={0}
      mt={0}
      component="p"
      fontSize="14px"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}
    >
      {children}
    </StyledBox>
  );
};

export const Small: FC<TypographyProps> = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <StyledBox
      fontSize="12px"
      fontWeight="500"
      lineHeight="1.5"
      component="small"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}
    >
      {children}
    </StyledBox>
  );
};

export const Span: FC<TypographyProps> = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <StyledBox
      component="span"
      lineHeight="1.5"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}
    >
      {children}
    </StyledBox>
  );
};

export const Tiny: FC<TypographyProps> = ({ children, className, ellipsis, ...restProps }) => {
  return (
    <StyledBox
      fontSize="10px"
      lineHeight="1.5"
      component="small"
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      {...restProps}
    >
      {children}
    </StyledBox>
  );
};

const Typography = { H1, H2, H3, H4, H5, H6, Paragraph, Small, Span, Tiny };

export default Typography;