import React, { useState } from "react";
import styles from "./promocodeCard.module.scss";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";

const PromocodeCard = ({ card }) => {
const [copy, setCopy] = useState(false);
console.log(copy);
    return (
        <div className={styles.promocodeCard}>
            <div className={styles.flexImg_wrapper}>
                <img src={card.url} alt="picture" className={styles.promocodeCard_image} />
                <div className={styles.promocodeCard_titleWrapper}>
                    <h3 className={styles.promocodeCard_titleWrapper_header}>{card.header}</h3>
                    <p className={styles.promocodeCard_titleWrapper_description}>{card.title}</p>
                </div>
            </div>
            <div className={styles.flexBtn_wrapper}>
                <div className={styles.promocodeCard_btn}>
                    <CopyToClipboard text = {card.promocode} onCopy={() => setCopy(true)}>
                        <button className={styles.promocodeBtn + " " + (copy ? styles.activeCopy : "") }>{copy ? "Скопировано" : "Скопировать"}</button>
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    );
};
PromocodeCard.propTypes = {
    card: PropTypes.object.isRequired
};
export default PromocodeCard;
