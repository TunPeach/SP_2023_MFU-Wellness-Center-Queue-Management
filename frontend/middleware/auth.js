export default function ({ app, redirect }) {
    const admin = process.client && window.sessionStorage.getItem('admin');
  
    if (!admin) {
      return redirect('/login');
    }
  }
  