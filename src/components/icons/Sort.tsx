import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  def: boolean;
};

const Sort: React.FC<Props> = ({def}) => {
  return (
    <Svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      style={{transform: [{scaleY: def ? 1 : -1}]}}>
      <Path
        d="M0.551781 3.86903L3.55899 0.922532C3.7939 0.692453 4.17496 0.692526 4.40972 0.922532L7.41681 3.86903C7.79542 4.23991 7.52581 4.87501 6.99143 4.87501H5.1875V16.6607C5.1875 16.9862 4.91819 17.25 4.58594 17.25H3.38281C3.05056 17.25 2.78125 16.9862 2.78125 16.6607V4.87501H0.977161C0.441733 4.87501 0.173962 4.23918 0.551781 3.86903ZM9.39844 3.10716H19.0234C19.3557 3.10716 19.625 2.84334 19.625 2.51787V1.3393C19.625 1.01383 19.3557 0.750018 19.0234 0.750018H9.39844C9.06619 0.750018 8.79687 1.01383 8.79687 1.3393V2.51787C8.79687 2.84334 9.06619 3.10716 9.39844 3.10716ZM8.79687 7.23215V6.05358C8.79687 5.72811 9.06619 5.4643 9.39844 5.4643H16.6172C16.9494 5.4643 17.2188 5.72811 17.2188 6.05358V7.23215C17.2188 7.55762 16.9494 7.82144 16.6172 7.82144H9.39844C9.06619 7.82144 8.79687 7.55762 8.79687 7.23215ZM8.79687 16.6607V15.4821C8.79687 15.1567 9.06619 14.8929 9.39844 14.8929H11.8047C12.1369 14.8929 12.4062 15.1567 12.4062 15.4821V16.6607C12.4062 16.9862 12.1369 17.25 11.8047 17.25H9.39844C9.06619 17.25 8.79687 16.9862 8.79687 16.6607ZM8.79687 11.9464V10.7679C8.79687 10.4424 9.06619 10.1786 9.39844 10.1786H14.2109C14.5432 10.1786 14.8125 10.4424 14.8125 10.7679V11.9464C14.8125 12.2719 14.5432 12.5357 14.2109 12.5357H9.39844C9.06619 12.5357 8.79687 12.2719 8.79687 11.9464Z"
        fill="#A8ADDD"
      />
    </Svg>
  );
};

export default Sort;
