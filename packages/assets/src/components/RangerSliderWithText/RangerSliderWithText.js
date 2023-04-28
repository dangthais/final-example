import React from 'react';
import PropTypes from 'prop-types';
import {RangeSlider, TextField} from '@shopify/polaris';

const RangerSliderWithText = ({value, onChange, label = '', helpText = ''}) => {
  return (
    <RangeSlider
      label={label}
      value={value}
      onChange={val => onChange(val)}
      output
      min={0}
      max={80}
      helpText={helpText}
      suffix={
        <p
          style={{
            maxWidth: '90px',
            minWidth: '24px',
            textAlign: 'right'
          }}
        >
          <TextField
            label={''}
            labelHidden={true}
            type="number"
            value={value}
            onChange={val => onChange(val)}
            autoComplete="off"
          />
        </p>
      }
    />
  );
};

RangerSliderWithText.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string,
  value: PropTypes.string
};

export default RangerSliderWithText;
