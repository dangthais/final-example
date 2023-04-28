import React from 'react';
import PropTypes from 'prop-types';
import {FormLayout} from '@shopify/polaris';
import {DesktopPositionInput} from '../DesktopPositionInput/DesktopPositionInput';
import DisplayCheckbox from '../DisplayCheckbox/DisplayCheckbox';
import TimingSettings from '../TimingSettings/TimingSettings';
const Display = ({label, input, handleChangeInput}) => {
  return (
    <FormLayout>
      <FormLayout.Group>
        <DesktopPositionInput
          label={label}
          helpText="The display position of the pop on your website"
          input={input}
          handleChangeInput={handleChangeInput}
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <DisplayCheckbox handleChangeInput={handleChangeInput} input={input} />
      </FormLayout.Group>
      <FormLayout.Group title="TIMING">
        <TimingSettings handleChangeInput={handleChangeInput} input={input} />
      </FormLayout.Group>
    </FormLayout>
  );
};
Display.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string
};
export default Display;
