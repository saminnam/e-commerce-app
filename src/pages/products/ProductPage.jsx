import React from 'react'
import ProductListPage from '../../components/ProductList'
import GlobalHero from '../../components/GlobalHero'


const ProductPage = () => {
  return (
    <div>
      <GlobalHero title={"🛍️ Our Products"}/>
      <ProductListPage />
    </div>
  )
}

export default ProductPage
