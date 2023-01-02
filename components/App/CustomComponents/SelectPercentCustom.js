import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { formatPercentValue } from '../../../lib/firebase-functions/Percent/PercentFunctions';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: 'var(--card-background)',
        color: 'var(--primary)',
        border: '1px solid #ced4da',
        fontSize: 'large',
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'ChangaOneRegular',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

export default function SelectPercentCustom(props) {
    const {percent, setPercent, percents, disabled} = props;

    const handleChange = (event) => {
        setPercent(event.target.value);
        console.log("new percent", event.target.value);
    };
    return (
        <div>
            <FormControl variant="standard" disabled={disabled}>
                {
                    /*
<InputLabel htmlFor={`percent${percent}`}>Percent</InputLabel>
                    */
                }
                <NativeSelect
                    id={`percent${percent}`}
                    value={percent}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                    {
                        percents.map((_percent,) => {
                            return (
                                <option key={_percent.uid} value={_percent.value}>{formatPercentValue(_percent.value)}</option>
                            )
                        })
                    }
                </NativeSelect>
            </FormControl>
        </div>
    );
}