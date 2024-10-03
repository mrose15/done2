import { Flex, useStyleConfig } from "@chakra-ui/react";

function GradientFlex(props) {
  const { variant, ...rest } = props;
  const styles = useStyleConfig("Flex", { variant });
  return <Flex __css={styles} {...rest} />;
}

export default GradientFlex;
