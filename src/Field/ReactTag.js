import _ from 'lodash';
import React, { useState } from 'react';
import TagsInput from 'react-tagsinput'
import { changeHandler, setFieldValueWrapper } from '../utils';
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

const ReactTag = ({ config, formik, value, error }) => {
    const {
        name,
        isMulti,
        defaultValue,
        fieldClass = '',
        noOptionsMessage,
        isDisabled = false,
        isClearable = false,
        isCreatable = false,
        delimiter= '',
        options: initialOptions,
        ...attributes
    } = config;
    const { setFieldValue, handleBlur } = formik;
    const [tagsValue, setTagsValue] = useState([]);
    const selectedOption = [];
    var selectProps = {
        name,
        isMulti,
        noOptionsMessage,
        isClearable,
        isDisabled,
        id: name,
        // inputValue,
        className: fieldClass + ( error ? ' is-invalid ' : '' ),
        onChange: ( selectedOptions ) => {
            const selectedValues = selectedOptions
            setTagsValue(selectedValues)
            return changeHandler(
                setFieldValueWrapper(setFieldValue, name),
                formik,
                config,
                selectedValues
            );
        },
        ...attributes
    };
    selectProps.value = tagsValue;
    return <TagsInput {...selectProps} />

}

export default React.memo(ReactTag);
