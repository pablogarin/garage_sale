import React from 'react'
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const Breadcrumb = ({ links }) => {
  const history = useHistory();
  const pushLink = (evt, href) => {
    evt.preventDefault();
    history.push(href);
  }

  const renderLink = (link) => {
    if (link.href) {
      return (
        <Link
          key={link.href}
          color="inherit"
          href={`${link.href}`}
          onClick={(evt) => pushLink(evt, link.href)}
        >
          {link.label}
        </Link>
      )
    }
    return (<Typography key={link.label} color="textPrimary">{link.label}</Typography>);
  }

  return (
    <Box py={3}>
      <Breadcrumbs aria-label="breadcrumb">
        {links && links.map((link) => renderLink(link))}
      </Breadcrumbs>
    </Box>
  )
}

export default Breadcrumb;
