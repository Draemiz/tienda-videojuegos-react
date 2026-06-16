import { useEffect } from 'react';
import './AlertaNotificacion.css';

function AlertaNotificacion({ mensaje, onCerrar }) {

    useEffect(() => {

        const temporizador = setTimeout(() => {
            onCerrar();
        }, 3000);

        return () => clearTimeout(temporizador);

    }, []);

    return (
        <div className="toast-contenedor">
            <div className="toast-icono">✅</div>
            <span className="toast-mensaje">{mensaje}</span>
            <button
                className="toast-cerrar"
                onClick={onCerrar}
            >
                ✕
            </button>
        </div>
    );
}

export default AlertaNotificacion;