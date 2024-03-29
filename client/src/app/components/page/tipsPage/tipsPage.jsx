import React, { useState, useEffect } from "react";
import styles from "./tipsPage.module.scss";
import NavButton from "../../common/uniButton";
import ProductCardsList from "../../common/goods/productCardList";
import Loader from "../../common/loader";
import FilterButton from "../../common/filterButton";
import FilterBlock from "../../common/filterBlock";
import HeaderMenu from "../../common/headerMenu";
import Footer from "../../common/footer";
import { useProducts } from "../../../hooks/useProducts";
import { useParams } from "react-router-dom";
import ProductCardPage from "../productCardPage/productCardPage";
import { sortedGoods } from "../../../utils/sortFilter";
import BreadCrumps from "../../common/breadcrumps";

const initialState = {
  priceFieldMin: "",
  priceFieldMax: "",
  typeOfNeedles: "",
  inStock: false,
  sort: "",
  brands: ""
};
const TipsPage = () => {
  const { products, isLoading, getById } = useProducts();
  const { productId } = useParams();
  const initialStateFilter = products.filter(({ category }) => category === "tips");
  const [dataFilter, setDataFilter] = useState(initialState);
  const [filtredTips, setFiltredTips] = useState(initialStateFilter);
  useEffect(() => {
    setFiltredTips(initialStateFilter);
  }, [products]);
  const sortedGoodsBox = sortedGoods(dataFilter, filtredTips);
  const heandleChange = (target) => {
    setDataFilter((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const productCard = getById(productId, filtredTips);
  const dataReload = () => {
    setDataFilter(initialState);
    setFiltredTips(initialStateFilter);
  };
  const getFilterTipsSales = (id) => {
    if (id === "#starter") {
      setFiltredTips(products.filter(({ category, starter }) => category === "tips" && starter));
    } else if (id === "#builders") {
      setFiltredTips(products.filter(({ category, builders }) => category === "tips" && builders));
    } else if (id === "#professional") {
      setFiltredTips(products.filter(({ category, professions }) => category === "tips" && professions));
    }
  };

  return products ? <div>

    {productCard ? (
      <ProductCardPage productCard={productCard} />
    ) : (
      <div>
        <header>
          <HeaderMenu />
        </header>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            {!isLoading ? (
              <div className={styles.main}>
                <div className={styles.BreadCrumps}>
                <BreadCrumps/>
                </div>
                <div className={styles.main_title}>
                  <h1 className={styles.main_title_header}>Наконечники</h1>
                </div>
                <div className={styles.main_buttonBlock}>
                  <div className={styles.main_buttonBlock_item}>
                    {" "}
                    <FilterButton
                      title="Для Начинающих"
                      onChange={getFilterTipsSales}
                      id="#starter"

                    />
                  </div>
                  <div className={styles.main_buttonBlock_item}>
                    {" "}
                    <FilterButton
                      title="От Билдеров"
                      onChange={getFilterTipsSales}
                      id="#builders"

                    />
                  </div>
                  <div className={styles.main_buttonBlock_item}>
                    {" "}
                    <FilterButton
                      title="Для Профессионалов"
                      onChange={getFilterTipsSales}
                      id="#professional"

                    />
                  </div>
                </div>
                <FilterBlock
                  data={dataFilter}
                  onChange={heandleChange}
                  label="Брэнд"
                  onClick={dataReload}
                />
                <div className={styles.main_wrapperBlock}>
                  <ProductCardsList products={sortedGoodsBox} />
                  <div className={styles.main_btn}>
                    <NavButton
                      fill="#EEEEEE;"
                      color="#BB8C5F"
                      title="Показать еще"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>)}
  </div> : <Loader />;
};

export default TipsPage;
