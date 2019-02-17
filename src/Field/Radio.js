import React from 'react';
import Label from './Label';
import { getIn } from 'formik';
import ErrorMessage from './ErrorMessage';
import { hasError, changeHandler, joinNames } from '../utils';

const Radio = ({ config, formik, submitCountToValidate }) => {
    const {
        name,
        type,
        label,
        attributes,
        options,
        labelClass = '',
        fieldClass = 'form-check-input',
        formGroupClass = 'form-group'
    } = config;
    const { values, handleChange } = formik;
    const error = hasError(name, submitCountToValidate, formik);

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            { options.map(( option ) =>
                <div className="form-check" key={ option.value }>
                    <label htmlFor={ name + '_' + option.value } className="form-check-label">
                        <input
                            name={ name }
                            type="radio"
                            className={ fieldClass + ( error ? ' is-invalid ' : '' ) }
                            id={ name + '_' + option.value }
                            value={ option.value }
                            checked={ getIn(values, name) === option.value }
                            onChange={ changeHandler.bind(this, handleChange, formik, config) }
                            { ...attributes } /> { option.title }
                    </label>
                </div>
            ) }
            <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
        </div>
    );
}

export default Radio;
