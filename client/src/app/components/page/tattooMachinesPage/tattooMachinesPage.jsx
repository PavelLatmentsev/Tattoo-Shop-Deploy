import React, { useState, useEffect } from "react";
import styles from "./tattoMachinePage.module.scss";
import NavButton from "../../common/uniButton";
import ProductCardsList from "../../common/goods/productCardList";
import Loader from "../../common/loader";
import FilterButton from "../../common/filterButton";
import FilterBlock from "../../common/filterBlock";
import HeaderMenu from "../../common/headerMenu";
import Footer from "../../common/footer";
import { useProducts } from "../../../hooks/useProducts";
import { useParams } from "react-router-dom";
import { sortedGoods } from "../../../utils/sortFilter";
import ProductCardPage from "../productCardPage/productCardPage";
import Breadcrumps from "../../common/breadcrumps";
const initialState = {
    priceFieldMin: "",
    priceFieldMax: "",
    typeOfNeedles: "",
    inStock: false,
    sort: "",
    brands: ""
};
const TattooMachinesPage = () => {
    const { productId } = useParams();
    const { products, getById, isLoading } = useProducts();
    const initialStateFilter = products.filter(({ category }) => category === "machines");
    const [filtredMachines, setFiltredMachines] = useState(initialStateFilter);
    const [dataFilter, setDataFilter] = useState(initialState);
    const sortedGoodsBox = sortedGoods(dataFilter, filtredMachines);
    const heandleChange = (target) => {
        setDataFilter((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const dataReload = () => {
        setDataFilter(initialState);
        setFiltredMachines(initialStateFilter);
    };
    useEffect(() => {
        setFiltredMachines(initialStateFilter);
    }, [products]);
    const productCard = getById(productId, filtredMachines);
    const getFilterMachinesSales = (id) => {
        if (id === "#starter") {
            setFiltredMachines(products.filter(({ category, starter }) => category === "machines" && starter));
        } else if (id === "#builders") {
            setFiltredMachines(products.filter(({ category, builders }) => category === "machines" && builders));
        } else if (id === "#professional") {
            setFiltredMachines(products.filter(({ category, professions }) => category === "machines" && professions));
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
                            <h1 className={styles.main_title_header}>Татту-Машинки</h1>
                        </div>
                        <div className={styles.main_buttonBlock}>
                            <div className={styles.main_buttonBlock_item}>  <FilterButton title="Для Начинающих" onChange={getFilterMachinesSales} id="#starter" /></div>
                            <div className={styles.main_buttonBlock_item}> <FilterButton title="От Билдеров" onChange={getFilterMachinesSales} id="#builders" /></div>
                            <div className={styles.main_buttonBlock_item}>   <FilterButton title="Для Профессионалов" onChange={getFilterMachinesSales} id="#professional" /></div>
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

export default TattooMachinesPage;
