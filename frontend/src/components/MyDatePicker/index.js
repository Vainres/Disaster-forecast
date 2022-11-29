import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



export default function MyDatePicker({value,setValue,context="DD/MM/YYYY"}){
    console.log(value)
    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
            OpenPickerButtonProps={{ style: { color: 'gray' } }}
            label={context}
            value={value}
            onChange={(newValue) => {
            console.log(newValue);
            setValue(newValue);
            
            }}
            renderInput={(params) => <TextField {...params} sx={{
                                            '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'gray',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'white',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'white',
                                            },
                                            },
                                        }}
                                        InputLabelProps={{ style: { color: "gray" } }} 
                                        inputProps={{ style: { color: "gray" } }}/>}
        />
    </LocalizationProvider>);
}
