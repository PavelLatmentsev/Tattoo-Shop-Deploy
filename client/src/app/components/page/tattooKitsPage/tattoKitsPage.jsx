import React, { useState, useEffect } from "react";
import styles from "./tattoKitsPage.module.scss";
import NavButton from "../../common/uniButton";
import ProductCardsList from "../../common/goods/productCardList";
import Loader from "../../common/loader";
import ProductCardPage from "../productCardPage/productCardPage";
import FilterButton from "../../common/filterButton";
import FilterBlock from "../../common/filterBlock";
import HeaderMenu from "../../common/headerMenu";
import Footer from "../../common/footer";
import { useProducts } from "../../../hooks/useProducts";
import { useParams } from "react-router-dom";
import { sortedGoods } from "../../../utils/sortFilter";
import Breadcrumps from "../../common/breadcrumps";
const initialState = {
    priceFieldMin: "",
    priceFieldMax: "",
    typeOfNeedles: "",
    inStock: false,
    sort: "",
    brands: ""
};
const TattooKitsPage = () => {
    const { productId } = useParams();
    const { products, isLoading, getById } = useProducts();
    const initialStateFilter = products.filter(({ category }) => category === "kits");
    const [filtredKits, setFiltredKits] = useState(initialStateFilter);
    const [dataFilter, setDataFilter] = useState(initialState);
    const sortedGoodsBox = sortedGoods(dataFilter, filtredKits);
    const heandleChange = (target) => {
        setDataFilter((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    useEffect(() => {
        setFiltredKits(initialStateFilter);
    }, [products]);
    const productCard = getById(productId, filtredKits);
    const dataReload = () => {
        setDataFilter(initialState);
        setFiltredKits(initialStateFilter);
    };
    const getFilterKitsSales = (id) => {
        if (id === "#starter") {
            setFiltredKits(products.filter(({ category, starter }) => category === "kits" && starter));
        } else if (id === "#builders") {
            setFiltredKits(products.filter(({ category, builders }) => category === "kits" && builders));
        } else if (id === "#professional") {
            setFiltredKits(products.filter(({ category, professions }) => category === "kits" && professions));
        }
    };
    return (products ? <div>

        {productCard ? <ProductCardPage productCard={productCard} /> : (<div>
            <header>
                <HeaderMenu />
            </header><div className={styles.wrapper}>
                <div className={styles.container}>
                    {!isLoading ? (<div className={styles.main}>
                        <div className={styles.BreadCrumps}>
                <Breadcrumps/>
                </div>
                        <div className={styles.main_title}>
                            <h1 className={styles.main_title_header}>Татту-Наборы</h1>
                        </div>
                        <div className={styles.main_buttonBlock}>
                            <div className={styles.main_buttonBlock_item}>  <FilterButton title="Для Начинающих" onChange={getFilterKitsSales} id="#starter" /></div>
                            <div className={styles.main_buttonBlock_item}> <FilterButton title="От Билдеров" onChange={getFilterKitsSales} id="#builders" /></div>
                            <div className={styles.main_buttonBlock_item}>   <FilterButton title="Для Профессионалов" onChange={getFilterKitsSales} id="#professional" /></div>
                        </div>
                        <FilterBlock data={dataFilter} onChange={heandleChange} label="Брэнд" onClick={dataReload} />
                        <div className={styles.main_wrapperBlock}>
                            <ProductCardsList products={sortedGoodsBox} />
                            <div className={styles.main_btn}>
                                <NavButton fill="#EEEEEE;" color="#BB8C5F" title="Показать еще" />
                            </div>
                        </div>
                    </div>) : <Loader />}
                </div>
            </div> <footer>
                <Footer />
            </footer>
        </div>)}
    </div> : <Loader />);
};

export default TattooKitsPage;
