import React from 'react';
import './NoticationPopup.scss';
import PropTypes from 'prop-types';
import {truncateString} from '@avada/assets/src/util/truncate';
const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  productImage = 'http://paris.mageplaza.com/images/shop/single/big-1.jpg',
  position = 'bottom-left',
  truncateProductName = false,
  hideTimeAgo = false,
  timestamp = 'a day ago'
}) => {
  return (
    <div
      className={`Avada-SP__Wrapper fadeInUp animated Avada-SP__Wrapper--${position}`}
    >
      <div className="Avada-SP__Inner">
        <div className="Avada-SP__Container">
          <a href="#" className={'Avada-SP__LinkWrapper'}>
            <div
              className="Avada-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            />
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>
                {truncateProductName
                  ? truncateString(productName, 16)
                  : productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                {hideTimeAgo ? '' : `${timestamp}`}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {
  firstName: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  productName: PropTypes.string,
  relativeDate: PropTypes.string,
  productImage: PropTypes.string,
  position: PropTypes.string
};

export default NotificationPopup;
