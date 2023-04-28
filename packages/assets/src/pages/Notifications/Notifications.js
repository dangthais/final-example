import useFetchApi from '../../hooks/api/useFetchApi';
import {
  Page,
  LegacyCard,
  ResourceList,
  ResourceItem,
  LegacyStack,
  Text,
  Pagination,
  FormLayout
} from '@shopify/polaris';
import React, {useState} from 'react';
import NoticationPopup from '../../components/NoticationPopup/NoticationPopup';
import moment from 'moment';
function Notifications() {
  const [selectedNotification, setSelectedNotification] = useState([]);
  const {loading, data} = useFetchApi('/notifications');
  return (
    <Page
      title="Notifications"
      subtitle="List of sales notifcation from Shopify"
    >
      <FormLayout>
        <FormLayout.Group>
          <LegacyCard>
            <ResourceList
              loading={loading}
              promotedBulkActions={[
                {
                  content: 'Settings',
                  onAction: async () => {}
                },
                {
                  content: 'Delete',
                  onAction: async () => {}
                }
              ]}
              resourceName={{singular: 'notification', plural: 'notifications'}}
              selectable
              selectedItems={selectedNotification}
              onSelectionChange={setSelectedNotification}
              sortOptions={[
                {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
                {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
              ]}
              items={data}
              renderItem={data => {
                const {
                  id,
                  productImage,
                  firstName,
                  productName,
                  timestamp
                } = data;
                return (
                  <ResourceItem
                    id={id}
                    url={productImage}
                    accessibilityLabel={`View details for ${productName}`}
                    initials={`View details for ${productName}`}
                    name={firstName}
                  >
                    <LegacyStack distribution="leading">
                      <LegacyStack.Item fill>
                        <div style={{maxWidth: '400px'}}>
                          <NoticationPopup data={data} />
                        </div>
                      </LegacyStack.Item>
                      <LegacyStack.Item>
                        <Text fontWeight="semibold" as="p">
                          From {moment(timestamp).format('MMM DD')},
                        </Text>
                        <Text alignment="end" fontWeight="semibold" as="p">
                          {moment(timestamp).year()}
                        </Text>
                      </LegacyStack.Item>
                    </LegacyStack>
                  </ResourceItem>
                );
              }}
            />
          </LegacyCard>
        </FormLayout.Group>
        {data.length > 5 && (
          <FormLayout.Group>
            <div style={{marginLeft: '45%'}}>
              <Pagination
                hasPrevious
                onPrevious={() => {
                  console.log('Previous');
                }}
                hasNext
                onNext={() => {
                  console.log('Next');
                }}
              />
            </div>
          </FormLayout.Group>
        )}
      </FormLayout>
    </Page>
  );
}
export default Notifications;
