import React, {useCallback, useEffect, useState} from 'react';
import {FormLayout, Layout, LegacyCard, Page, Tabs} from '@shopify/polaris';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {paginateSamples as paginateSamplesAction} from '../../actions/sample/paginateSample';
import useFetchApi from '../../hooks/api/useFetchApi';
import NoticationPopup from '../../components/NoticationPopup/NoticationPopup';
import Triggers from '../../components/Triggers/Triggers';
import Display from '../../components/Display/Display';
import defaultSettings from '../../util/deaultSettings';
import SkeletonPages from '../../components/SkeletonPage/SkeletonPage';
function Settings() {
  const {
    loading,
    handleChangeInput,
    data,
    setData,
    updateData,
    setLoading
  } = useFetchApi('/settings', defaultSettings);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = useCallback(
    selectedTabIndex => setSelectedTab(selectedTabIndex),
    []
  );
  const handleUpdateSettings = () => {
    updateData(data);
  };

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      setData(data);
      setLoading(false);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [loading]);

  const tabs = [
    {
      id: 'display',
      content: 'Display',
      title: 'APPEARANCE',
      design: (
        <Display
          label="Desktop Position"
          input={data}
          handleChangeInput={handleChangeInput}
        />
      )
    },
    {
      id: 'triggers',
      content: 'Triggers',
      design: <Triggers input={data} handleChangeInput={handleChangeInput} />
    }
  ];
  return (
    <Page
      title="Settings"
      subtitle="Deceide how your notifications will display"
      primaryAction={{
        content: 'Save',
        onAction: handleUpdateSettings,
        loading
      }}
      fullWidth={true}
    >
      <FormLayout>
        {isLoading ? (
          <SkeletonPages />
        ) : (
          <Layout>
            <Layout.Section secondary>
              <NoticationPopup data={data} />
            </Layout.Section>
            <Layout.Section>
              <LegacyCard>
                <Tabs
                  tabs={tabs}
                  selected={selectedTab}
                  onSelect={handleTabChange}
                >
                  <LegacyCard.Section title={tabs[selectedTab].title}>
                    {tabs[selectedTab].design}
                  </LegacyCard.Section>
                </Tabs>
              </LegacyCard>
            </Layout.Section>
          </Layout>
        )}
      </FormLayout>
    </Page>
  );
}

Settings.propTypes = {
  paginateSamples: PropTypes.func.isRequired,
  sample: PropTypes.object.isRequired
};

const mapStateToProps = app => ({
  sample: app.sample
});

const mapStateToDispatch = {
  paginateSamplesAction
};

export default connect(mapStateToProps, mapStateToDispatch)(Settings);
