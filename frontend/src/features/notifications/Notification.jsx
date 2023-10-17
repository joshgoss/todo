import './Notifications.scss';
import {useSelector} from 'react-redux';
import classNames from 'classnames';
import {selectNotification, notificationType} from './notificationsSlice';

const Notifications = () => {
    const notification = useSelector(selectNotification) || {};
    const classes = classNames('notifications', {
        hide: !notification.id,
        success: notification.type === notificationType.SUCCESS,
        failure: notification.type === notificationType.FAILURE,
        info: notification.type === notificationType.INFO
    })

    return(
        <div className={classes}>
            <p className='message'>{notification.message}</p>
        </div> 
    );
}

export default Notifications;