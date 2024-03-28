import React from 'react'
import { useAllProducts } from '../../context/productContext'
import AdminMenu from '../../component/AdminMenu';

export default function AllProducts() {
    const { products } = useAllProducts();
  return (
      <div className='main_left'>
        <AdminMenu />
        <table className='all_products'>
            <thead>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock Quantity</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Remove</th>
              </thead>
              <tbody>
                  {products.map((product, index) => (
                      <tr key={index}>
                          <td className='all_product-image'><img src={product.image.url} alt="" /></td>
                         <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.stockQuantity}</td>
                          <td>{product.category}</td> 
                          <td><button>Edit</button></td>
                          <td><button>Remove</button></td>
                      </tr>
                  ))}
              </tbody>
        </table>
    </div>
  )
}
