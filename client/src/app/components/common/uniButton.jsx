import React from "react";
import styles from "./uniButton.module.scss";
import PropTypes from "prop-types";

const NavButton = ({ fill, color, title, onChange, disabled }) => {
  return (
    <div className={styles.buttonWrapper}>
      <div className={styles.button}>
        <button onClick={onChange} className={styles.button_btn} disabled={disabled}>
          <a
            href="//"
            className={styles.button_link}
            style={{ color: `${color}` }}
          >
            {title}
          </a>
          <svg
          className={styles.button_linkImage}
            width="275"
            height="70"
            viewBox="0 0 275 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

          >
            <path
              d="M16 17.5V1H259V17.5V26.25V26.8244L259.496 27.1138L273.015 35L259.496 42.8862L259 43.1756V43.75V52.5V69H16V52.5V43.75V43.1756L15.5039 42.8862L1.98463 35L15.5039 27.1138L16 26.8244V26.25V17.5Z"
              fill={fill}
              stroke="#BB8C5F"
              strokeWidth="2"
              className={styles.button_img}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
NavButton.propTypes = {
  color: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  title: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

export default NavButton;
