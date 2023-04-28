import {
  SkeletonPage,
  Layout,
  LegacyCard,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer
} from '@shopify/polaris';
import React from 'react';

const SkeletonPages = () => {
  return (
    <SkeletonPage primaryAction>
      <Layout>
        <Layout.Section secondary>
          <LegacyCard sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={3} />
            </TextContainer>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard>
            <LegacyCard.Section>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={5} />
              </TextContainer>
            </LegacyCard.Section>
            <LegacyCard.Section>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </LegacyCard.Section>
            <LegacyCard.Section>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
};

export default SkeletonPages;
