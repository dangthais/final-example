import {FormLayout, Labelled, LegacyStack, Text} from '@shopify/polaris';
import React from 'react';
import './DesktopPositionInput.scss';

const defaultOptions = [
  {label: 'Bottom left', value: 'bottom-left'},
  {label: 'Bottom right', value: 'bottom-right'},
  {label: 'Top left', value: 'top-left'},
  {label: 'Top right', value: 'top-right'}
];

export const DesktopPositionInput = ({
  label,
  helpText,
  input,
  handleChangeInput
}) => {
  return (
    <FormLayout>
      <Labelled label={label}>
        <LegacyStack>
          {defaultOptions?.map((option, key) => (
            <div
              key={key}
              className={`Avada-DesktopPosition ${
                input.position === option.value
                  ? 'Avada-DesktopPosition--selected'
                  : ''
              }`}
              onClick={() => handleChangeInput('position', option.value)}
            >
              <div
                className={`Avada-DesktopPosition__Input Avada-DesktopPosition__Input--${option.value}`}
              ></div>
            </div>
          ))}
        </LegacyStack>
        <Text variation="subdued" as="p">
          {helpText}
        </Text>
      </Labelled>
    </FormLayout>
  );
};
