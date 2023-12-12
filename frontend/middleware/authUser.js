export default function ({ app, redirect }) {
    const user = process.client && window.sessionStorage.getItem('user');
  
    if (!user) {
      return redirect('/loginFon');
    }
  }