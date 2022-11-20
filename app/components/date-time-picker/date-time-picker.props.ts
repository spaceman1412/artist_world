import {ModalProps} from 'react-native';

export interface DateTimePickerProps extends ModalProps {
  visible?: boolean;
  onBackPress?: () => void;
  onSave?: (value) => void;
}
