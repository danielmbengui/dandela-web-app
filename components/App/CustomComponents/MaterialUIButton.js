import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const CustomButton = styled(Button)(() => ({
    backgroundColor: 'var(--primary)',
    fontFamily: 'ChangaOneRegular',
    color: 'var(text-secondary)',
}));

export default function MaterialUIButton(props) {
    const {variant, text, onClick} = props;

    return(
        <CustomButton
        variant={variant}
        onClick={onClick}
        >
            {text}
        </CustomButton>
    )
}