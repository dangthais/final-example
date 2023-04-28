import React from 'react';
import {FormLayout} from '@shopify/polaris';
import RangerSliderWithText from '../RangerSliderWithText/RangerSliderWithText';

const TimingSettings = ({input, handleChangeInput}) => {
  return (
    <FormLayout>
      <FormLayout.Group>
        <FormLayout>
          <FormLayout.Group oneThird>
            <RangerSliderWithText
              label="Display duration"
              value={input.displayDuration}
              onChange={val => handleChangeInput('displayDuration', val)}
              helpText="How long each pop will display on your page"
              min={0}
              max={80}
            />
          </FormLayout.Group>
          <FormLayout.Group oneThird>
            <RangerSliderWithText
              label="Gap time between two pops"
              value={input.firstDelay}
              onChange={val => handleChangeInput('firstDelay', val)}
              output
              helpText="The time interval between the popup notifications"
              min={0}
              max={80}
            />
          </FormLayout.Group>
        </FormLayout>
        <FormLayout>
          <FormLayout.Group oneThird>
            <RangerSliderWithText
              label="Time before the fisrt pop"
              value={input.popsInterval}
              onChange={val => handleChangeInput('popsInterval', val)}
              output
              helpText="The delay time before the first notifications"
              min={0}
              max={80}
            />
          </FormLayout.Group>
          <FormLayout.Group oneThird>
            <RangerSliderWithText
              label="Maximum of popups"
              value={input.maxPopsDisplay}
              onChange={val => handleChangeInput('maxPopsDisplay', val)}
              output
              min={0}
              max={80}
              helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80"
            />
          </FormLayout.Group>
        </FormLayout>
      </FormLayout.Group>
    </FormLayout>
  );
};

export default TimingSettings;
