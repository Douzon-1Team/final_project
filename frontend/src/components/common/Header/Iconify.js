import PropTypes from 'prop-types';
// icons
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Iconify.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    sx: PropTypes.object,
};

export default function Iconify({ icon, sx, ...other }) {
    return <Box icon={icon} sx={{ ...sx }} {...other} />;
}
