import Swal from 'sweetalert2';

// ✅ Función para mostrar alertas
export const showAlert = (title, text, icon) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: '#3085d6', 
  });
};

// ✅ Validaciones con alertas
export const validateCredentials = (email, password, confirmPassword = null) => {
  if (!email || !password) {
    showAlert('Error', 'Todos los campos son obligatorios.', 'error');
    return false;
  }

  if (password.length < 6) {
    showAlert('Error', 'La contraseña debe tener al menos 6 caracteres.', 'error');
    return false;
  }

  if (password.includes(' ')) {
    showAlert('Error', 'La contraseña no debe contener espacios 🚫.', 'error');
    return false;
  }

  if (confirmPassword !== null && password !== confirmPassword) {
    showAlert('Error', 'El password y la confirmación deben ser iguales.🔍.', 'error');
    return false;
  }

  return true;
};
