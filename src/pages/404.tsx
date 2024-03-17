import { Link } from 'react-router-dom'

export const Page404 = () => {
  return (
    <div>
      <Link
        style={{
          display: 'block',
          fontSize: '24px',
          fontWeight: 'bold',
          marginTop: '30px',
          textAlign: 'center',
        }}
        to={'/'}
      >
        Back to main page
      </Link>
      <img
        alt={'page not found'}
        src={'https://geekcity.ru/wp-content/uploads/2018/05/GeekCity-404-Page.jpg'}
        width={'100%'}
      />
    </div>
  )
}
