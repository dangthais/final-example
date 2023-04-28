import React from 'react';
import {
  Page,
  LegacyCard,
  ResourceList,
  ResourceItem,
  LegacyStack,
  Button,
  Text,
  FormLayout
} from '@shopify/polaris';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  return (
    <Page title="Home">
      <FormLayout>
        <FormLayout.Group>
          <LegacyCard>
            <ResourceList
              resourceName={{singular: 'customer', plural: 'customers'}}
              items={[
                {
                  id: '200',
                  url: '#',
                  location: 'App status is Disable'
                }
              ]}
              renderItem={item => {
                const {id} = item;
                return (
                  <ResourceItem id={id}>
                    <LegacyStack distribution="leading">
                      <LegacyStack.Item fill>
                        <Text as="p">
                          <div style={{margin: '8px'}}>
                            App status is <strong>Disable</strong>
                          </div>
                        </Text>
                      </LegacyStack.Item>
                      <LegacyStack.Item>
                        <LegacyStack>
                          <LegacyStack.Item>
                            <Button primary>Enable</Button>
                          </LegacyStack.Item>
                        </LegacyStack>
                      </LegacyStack.Item>
                    </LegacyStack>
                  </ResourceItem>
                );
              }}
            />
          </LegacyCard>
        </FormLayout.Group>
      </FormLayout>
    </Page>
  );
}
