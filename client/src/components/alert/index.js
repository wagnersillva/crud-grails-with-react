import './style.css'
import { notification } from 'antd';

const DEFAULT_TIME = 2.5

export default function Alert({ message, time, className, type }) {
    return (
        notification[type]({
            message: message || type,
            duration: DEFAULT_TIME,
            className: `alert-notification ${className || ''}`
        })
    )
}