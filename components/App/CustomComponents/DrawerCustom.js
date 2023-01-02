import { Box, Drawer } from "@mui/material";

export default function DrawerCustom(props) {
    const { children, mobileOpen, handleDrawerToggle, drawerWidth } = props;
    return (
        <Box
            component="nav"
            sx={{
                width: { xs: 0, md: drawerWidth }, flexShrink: { sm: 0 },
                bgcolor: 'var(--menu-background)'
            }}
            aria-label="my dashboard"
        >
            <Drawer
                //container={container}
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    bgcolor: 'var(--menu-background)',
                    //width: '100%',
                    //height: '100%',
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box', width: drawerWidth - 60,
                        bgcolor: 'var(--menu-background)', height: '100%'
                    },
                }}
            >
                {children}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    bgcolor: 'var(--menu-background)',
                    width: '100%',
                    height: '100%',
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box', width: drawerWidth,
                        bgcolor: 'var(--menu-background)', height: '100%'
                    },
                }}
                open
            >
                {children}
            </Drawer>
        </Box>
    )
}