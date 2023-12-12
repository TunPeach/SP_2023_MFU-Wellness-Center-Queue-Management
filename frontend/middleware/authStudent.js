export default function ({ app, redirect }) {
    const student = process.client && window.sessionStorage.getItem('student');
  
    if (!student) {
      return redirect('/loginStudent');
    }
  }