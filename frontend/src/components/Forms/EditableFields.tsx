import {
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  FormLabel,
  ButtonGroup,
  IconButton,
  Flex,
  Box,
  Input,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

interface EditableFieldsProps {
  data: string;
  label: string;
}

const EditableFields = ({ data, label }: EditableFieldsProps) => {
  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<CheckIcon />}
          aria-label="Submit"
          {...getSubmitButtonProps()}
        />
        <IconButton
          icon={<CloseIcon />}
          aria-label="Cancel"
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Box justifyContent="center">
        <IconButton
          size="sm"
          icon={<EditIcon />}
          aria-label="Edit"
          {...getEditButtonProps()}
        />
      </Box>
    );
  };

  return (
    <Editable defaultValue={data} isPreviewFocusable={true} mb={3}>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <FormLabel mt={1}>{label}:</FormLabel>
        <EditablePreview />
        <Input as={EditableInput} />
        <Box mx={10}>
          <EditableControls />
        </Box>
      </Flex>
    </Editable>
  );
};

export default EditableFields;
