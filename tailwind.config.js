module.exports = {
    theme: {
        animations: { // defaults to {}; the following are examples
            'spin': {
                from: {
                    transform: 'rotate(0deg)',
                },
                to: {
                    transform: 'rotate(360deg)',
                },
            },
            'jump': {
                '0%': {
                    transform: 'translateY(0%)',
                },
                '50%': {
                    transform: 'translateY(-100%)',
                },
                '100%': {
                    transform: 'translateY(0%)',
                },
            },
        },
        animationDuration: { // defaults to these values
            'default': '1s',
            '0s': '0s',
            '1s': '1s',
            '2s': '2s',
            '3s': '3s',
            '4s': '4s',
            '5s': '5s',
        },
        animationTimingFunction: { // defaults to these values
            'default': 'ease',
            'linear': 'linear',
            'ease': 'ease',
            'ease-in': 'ease-in',
            'ease-out': 'ease-out',
            'ease-in-out': 'ease-in-out',
        },
        animationDelay: { // defaults to these values
            'default': '0s',
            '0s': '0s',
            '1s': '1s',
            '2s': '2s',
            '3s': '3s',
            '4s': '4s',
            '5s': '5s',
        },
        animationIterationCount: { // defaults to these values
            'default': 'infinite',
            'once': '1',
            'infinite': 'infinite',
        },
        animationDirection: { // defaults to these values
            'default': 'normal',
            'normal': 'normal',
            'reverse': 'reverse',
            'alternate': 'alternate',
            'alternate-reverse': 'alternate-reverse',
        },
        animationFillMode: { // defaults to these values
            'default': 'none',
            'none': 'none',
            'forwards': 'forwards',
            'backwards': 'backwards',
            'both': 'both',
        },
        animationPlayState: { // defaults to these values
            'running': 'running',
            'paused': 'paused',
        },
        extend: {
            transitionProperty: { // extending few more transition property
                'height': 'height',
                'spacing': 'margin, padding',
                'slide-left' : 'margin-right'
            },
            spacing: {
                '0px' : '0px',
                '5px': '5px',
                '12px': '12px',
                '393px' : '393px',
                '-200px' : '-200px',
                '200px': '200px',
                '21px': '21px',
            }
        },
        inset: {
            '0': 0,
            '3px' : '3px',
            '-25px' : '-25px'
        }
    },
    variants: { // all the following default to ['responsive']
        animations: ['responsive'],
        animationDuration: ['responsive'],
        animationTimingFunction: ['responsive'],
        animationDelay: ['responsive'],
        animationIterationCount: ['responsive'],
        animationDirection: ['responsive'],
        animationFillMode: ['responsive'],
        animationPlayState: ['responsive'],
    },
    plugins: [
        require('tailwindcss-animations'),
    ],
};