import React from 'react';
import {FormLayout, Checkbox} from '@shopify/polaris';
const DisplayCheckbox = ({input, handleChangeInput}) => {
  return (
    <FormLayout>
      <Checkbox
        label="Hide time ago"
        checked={input.hideTimeAgo}
        onChange={val => handleChangeInput('hideTimeAgo', val)}
      />
      <Checkbox
        label="Truncate content text"
        checked={input.truncateProductName}
        onChange={val => handleChangeInput('truncateProductName', val)}
        helpText="If your product name is long for one line, it will be truncated to 'Produc....'"
      />
    </FormLayout>
  );
};

export default DisplayCheckbox;
