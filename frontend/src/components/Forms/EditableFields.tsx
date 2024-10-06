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
import { useState } from "react";
import axios from "axios";
import { StringValidation } from "zod";

type EditableFieldsProps = {
  field: string;
  value: string;
  username: string;
  label: string;
};

const EditableFields = ({
  label,
  value,
  username,
  field,
}: EditableFieldsProps) => {
  const [newValue, setNewValue] = useState(value);

  const handleOnChange = (e: any) => {
    setNewValue(e.target.value);
  };

  const handleSubmitToDB = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      console.log("Sending request with data:", { username, field, newValue });

      const res = await axios.post(
        "http://localhost:3025/auth/change-account-details",
        {
          username,
          field,
          value: newValue,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response status:", res.status);
      console.log("Response data:", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="flex-start" size="sm">
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
    <Editable
      defaultValue={value}
      isPreviewFocusable={true}
      mb={4}
      onChange={setNewValue}
      onSubmit={handleSubmitToDB}
    >
      <Flex gap="2">
        <FormLabel mt={2} htmlFor={field} flex="1">
          {label}:
        </FormLabel>
        <Box flex="2">
          <EditablePreview p={2} />
          <Input id={field} as={EditableInput} onChange={handleOnChange} />
        </Box>
        <Box mx={10} flex="1">
          <EditableControls />
        </Box>
      </Flex>
    </Editable>
  );
};

export default EditableFields;
