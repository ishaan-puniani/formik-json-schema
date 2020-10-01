import _ from "lodash";
import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import { changeHandler, setFieldValueWrapper } from "../utils";
import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.

const ReactTag = ({ config, formik, value, error }) => {
  const {
    name,
    label,
    isMulti,
    defaultValue,
    fieldClass = "",
    noOptionsMessage,
    isDisabled = false,
    isClearable = false,
    isCreatable = false,
    delimiter = "",
    options: initialOptions,
    ...attributes
  } = config;
  const { setFieldValue } = formik;
  const selectedValue = value || defaultValue;
  const [tagsValue, setTagsValue] = useState(
    selectedValue ? selectedValue : []
  );
  var selectProps = {
    name,
    isMulti,
    noOptionsMessage,
    isClearable,
    isDisabled,
    id: name,
    inputProps: {
      placeholder: label ? label : "Add a tag",
    },
    className: fieldClass + (error ? " is-invalid " : ""),
    onChange: (selectedOptions) => {
      const selectedValues =
        delimiter && delimiter.length > 0
          ? selectedOptions.reduce((aggregator, val) => {
              return aggregator.concat(
                val.split(delimiter).map((d) => d.trim())
              );
            }, [])
          : selectedOptions;
      setTagsValue(selectedValues);
      return changeHandler(
        setFieldValueWrapper(setFieldValue, name),
        formik,
        config,
        selectedValues
      );
    },
    ...attributes,
  };
  selectProps.value = tagsValue;
  return <TagsInput {...selectProps} />;
};

export default React.memo(ReactTag);
