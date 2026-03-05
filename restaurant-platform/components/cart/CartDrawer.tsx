// // components/cart/CartDrawer.tsx
// 'use client'

// import { useCart } from '@/context/CartContext'
// import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi'
// import { useState, useEffect } from 'react'
// import Link from 'next/link'

// export default function CartDrawer() {
//   const { 
//     items, 
//     isCartOpen, 
//     setIsCartOpen, 
//     removeFromCart, 
//     updateQuantity, 
//     getCartTotal,
//     clearCart,
//     restaurant // Get restaurant from context
//   } = useCart()
  
//   // Get colors from restaurant context
//   const primaryColor = restaurant?.primaryColor || '#FF6B6B'
//   const secondaryColor = restaurant?.secondaryColor || '#4ECDC4'
//   const subdomain = restaurant?.subdomain || ''
  
//   const [isCheckingOut, setIsCheckingOut] = useState(false)

//   const formatPrice = (price: number) => {
//     return `Rs ${price.toLocaleString('en-IN', {
//       maximumFractionDigits: 0
//     })}`
//   }

//   const subtotal = getCartTotal()
//   const deliveryFee = subtotal > 3000 ? 0 : 399
//   const total = subtotal + deliveryFee

//   const handleCheckout = () => {
//     setIsCheckingOut(true)
//     setTimeout(() => {
//       alert('Order placed successfully! 🎉')
//       clearCart()
//       setIsCartOpen(false)
//       setIsCheckingOut(false)
//     }, 1500)
//   }

//   if (!isCartOpen) return null

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           zIndex: 9999,
//         }}
//         onClick={() => setIsCartOpen(false)}
//       />
      
//       {/* Drawer */}
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           right: 0,
//           width: '100%',
//           maxWidth: '400px',
//           height: '100%',
//           backgroundColor: 'white',
//           zIndex: 10000,
//           boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.1)',
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         {/* Header */}
//         <div style={{
//           padding: '16px',
//           borderBottom: '1px solid #e5e7eb',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           backgroundColor: primaryColor,
//           color: 'white'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <FiShoppingBag size={24} />
//             <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Your Cart</h2>
//             <span style={{
//               backgroundColor: 'white',
//               color: primaryColor,
//               padding: '2px 8px',
//               borderRadius: '999px',
//               fontSize: '14px',
//               fontWeight: 500
//             }}>
//               {items.length} {items.length === 1 ? 'item' : 'items'}
//             </span>
//           </div>
//           <button
//             onClick={() => setIsCartOpen(false)}
//             style={{
//               padding: '8px',
//               borderRadius: '8px',
//               border: 'none',
//               background: 'transparent',
//               color: 'white',
//               cursor: 'pointer',
//             }}
//           >
//             <FiX size={24} />
//           </button>
//         </div>

//         {/* Cart Items */}
//         <div style={{
//           flex: 1,
//           overflowY: 'auto',
//           padding: '16px'
//         }}>
//           {items.length === 0 ? (
//             <div style={{
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: '#6b7280'
//             }}>
//               <FiShoppingBag size={64} style={{ marginBottom: '16px', color: '#d1d5db' }} />
//               <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>Your cart is empty</p>
//               <p style={{ fontSize: '14px', textAlign: 'center', marginBottom: '16px' }}>
//                 Add some delicious items from our menu!
//               </p>
//               <button
//                 onClick={() => setIsCartOpen(false)}
//                 style={{
//                   backgroundColor: primaryColor,
//                   color: 'white',
//                   padding: '8px 24px',
//                   borderRadius: '8px',
//                   border: 'none',
//                   fontSize: '16px',
//                   fontWeight: 500,
//                   cursor: 'pointer'
//                 }}
//               >
//                 Browse Menu
//               </button>
//             </div>
//           ) : (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//               {items.map((item) => (
//                 <div key={item.id} style={{
//                   backgroundColor: '#f9fafb',
//                   borderRadius: '12px',
//                   padding: '12px',
//                   display: 'flex',
//                   gap: '12px',
//                   border: '1px solid #e5e7eb'
//                 }}>
//                   <div style={{
//                     width: '80px',
//                     height: '80px',
//                     borderRadius: '8px',
//                     overflow: 'hidden',
//                     flexShrink: 0,
//                     border: '1px solid #e5e7eb'
//                   }}>
//                     <img
//                       src={item.image || '/images/placeholder-food.jpg'}
//                       alt={item.name}
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         objectFit: 'cover'
//                       }}
//                     />
//                   </div>

//                   <div style={{ flex: 1 }}>
//                     <div style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'flex-start'
//                     }}>
//                       <div>
//                         <h3 style={{ fontWeight: 600, color: '#111827', marginBottom: '4px' }}>{item.name}</h3>
//                         <p style={{
//                           fontSize: '13px',
//                           color: '#6b7280',
//                           marginBottom: '8px'
//                         }}>
//                           {item.description}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         style={{
//                           background: 'transparent',
//                           border: 'none',
//                           color: '#9ca3af',
//                           cursor: 'pointer',
//                         }}
//                       >
//                         <FiTrash2 size={16} />
//                       </button>
//                     </div>

//                     <div style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                       marginTop: '4px'
//                     }}>
//                       <span style={{
//                         fontWeight: 700,
//                         fontSize: '18px',
//                         color: primaryColor
//                       }}>
//                         {formatPrice(item.price * item.quantity)}
//                       </span>
                      
//                       <div style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         backgroundColor: 'white',
//                         borderRadius: '8px',
//                         padding: '4px',
//                         border: '1px solid #d1d5db',
//                       }}>
//                         <button
//                           onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                           style={{
//                             width: '28px',
//                             height: '28px',
//                             borderRadius: '6px',
//                             backgroundColor: '#f3f4f6',
//                             border: 'none',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             cursor: 'pointer',
//                           }}
//                         >
//                           <FiMinus size={14} />
//                         </button>
                        
//                         <span style={{ 
//                           width: '32px', 
//                           textAlign: 'center',
//                           fontWeight: 600,
//                           fontSize: '16px',
//                           color: '#111827'
//                         }}>
//                           {item.quantity}
//                         </span>
                        
//                         <button
//                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                           style={{
//                             width: '28px',
//                             height: '28px',
//                             borderRadius: '6px',
//                             backgroundColor: '#f3f4f6',
//                             border: 'none',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             cursor: 'pointer',
//                           }}
//                         >
//                           <FiPlus size={14} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {items.length > 0 && (
//           <div style={{
//             borderTop: '1px solid #e5e7eb',
//             padding: '16px',
//             backgroundColor: 'white',
//           }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginBottom: '12px'
//             }}>
//               <span style={{ color: '#6b7280' }}>Subtotal</span>
//               <span style={{ fontWeight: 600, fontSize: '18px', color: '#111827' }}>
//                 {formatPrice(subtotal)}
//               </span>
//             </div>

//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginBottom: '12px',
//               fontSize: '14px',
//               color: '#6b7280'
//             }}>
//               <span>Delivery Fee</span>
//               <span style={{ fontWeight: 500 }}>
//                 {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
//               </span>
//             </div>

//             {deliveryFee > 0 && (
//               <div className="text-xs p-2 rounded-lg mb-3" style={{ backgroundColor: `${secondaryColor}20`, color: secondaryColor }}>
//                 Add Rs {3000 - subtotal} more for free delivery
//               </div>
//             )}

//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginBottom: '16px',
//               paddingTop: '12px',
//               borderTop: '1px solid #e5e7eb'
//             }}>
//               <span style={{ fontWeight: 600, fontSize: '18px', color: '#111827' }}>Total</span>
//               <span style={{
//                 fontWeight: 700,
//                 fontSize: '22px',
//                 color: primaryColor
//               }}>
//                 {formatPrice(total)}
//               </span>
//             </div>

//             <Link
//               href={`/checkout?subdomain=${subdomain}`}
//               onClick={() => setIsCartOpen(false)}
//               style={{
//                 width: '100%',
//                 backgroundColor: primaryColor,
//                 color: 'white',
//                 padding: '14px',
//                 borderRadius: '10px',
//                 border: 'none',
//                 fontSize: '16px',
//                 fontWeight: 600,
//                 textAlign: 'center',
//                 display: 'block',
//                 textDecoration: 'none',
//                 transition: 'all 0.3s ease',
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.backgroundColor = secondaryColor}
//               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = primaryColor}
//             >
//               Proceed to Checkout
//             </Link>

//             <button
//               onClick={clearCart}
//               style={{
//                 width: '100%',
//                 textAlign: 'center',
//                 fontSize: '14px',
//                 color: '#9ca3af',
//                 background: 'transparent',
//                 border: 'none',
//                 marginTop: '12px',
//                 cursor: 'pointer',
//               }}
//             >
//               Clear Cart
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }