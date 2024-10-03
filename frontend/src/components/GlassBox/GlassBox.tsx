import { Box, useStyleConfig } from "@chakra-ui/react";

function GlassBox(props) {
  const { variant, ...rest } = props;
  const styles = useStyleConfig("Box", { variant });
  return <Box __css={styles} {...rest} />;
}

export default GlassBox;
