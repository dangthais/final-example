import React, {useCallback} from 'react';
import {Select, FormLayout, TextField} from '@shopify/polaris';
const Triggers = ({input, handleChangeInput}) => {
  const handleSelectChange = useCallback(
    value => handleChangeInput('allowShow', value),
    []
  );
  const options = [
    {label: 'All Pages', value: 'all'},
    {label: 'Specific Pages', value: 'specific'}
  ];
  return (
    <FormLayout>
      <FormLayout.Group>
        <FormLayout>
          <Select
            label="PAGES RESTRICTION"
            options={options}
            onChange={handleSelectChange}
            value={input.allowShow}
          />
        </FormLayout>
      </FormLayout.Group>
      <FormLayout.Group>
        <FormLayout>
          <TextField
            value={input.excludedUrls}
            onChange={val => handleChangeInput('excludedUrls', val)}
            label="Included pages"
            type="email"
            autoComplete="email"
            multiline={4}
            helpText={
              <span>
                Page URLs NOT to show the pop-up (separated by new lines)
              </span>
            }
          />
          {input.allowShow === 'specific' && (
            <TextField
              value={input.includedUrls}
              onChange={val => handleChangeInput('includedUrls', val)}
              label="Excluded pages"
              type="email"
              autoComplete="email"
              multiline={4}
              helpText={
                <span>
                  Page URLs to show the pop-up (separated by new lines)
                </span>
              }
            />
          )}
        </FormLayout>
      </FormLayout.Group>
    </FormLayout>
  );
};

export default Triggers;
