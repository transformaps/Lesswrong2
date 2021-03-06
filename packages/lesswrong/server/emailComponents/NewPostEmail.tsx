import React from 'react';
import { postGetPageUrl } from '../../lib/collections/posts/helpers';
import { Components, registerComponent } from '../../lib/vulcan-lib/components';
import { useSingle } from '../../lib/crud/withSingle';
import './EmailFormatDate';
import './EmailPostAuthors';
import './EmailContentItemBody';
import './EmailPostDate';

const styles = (theme: ThemeType): JssStyles => ({
  heading: {
    textAlign: "center",
  },
  
  headingLink: {
    color: "black",
    textDecoration: "none",
  },
  
  headingHR: {
    width: 210,
    height: 0,
    borderTop: "none",
    borderBottom: "1px solid #aaa",
    marginTop: 50,
    marginBottom: 35,
  },
});

const NewPostEmail = ({documentId, classes, reason}: {
  documentId: string,
  classes: any,
  reason?: string,
}) => {
  const { document } = useSingle({
    documentId,
    
    collectionName: "Posts",
    fragmentName: "PostsRevision",
    extraVariables: {
      version: 'String'
    }
  });
  const { EmailPostAuthors, EmailContentItemBody, EmailPostDate } = Components;
  if (!document) return null;
  return (<React.Fragment>
    <div className={classes.heading}>
      <h1>
        <a href={postGetPageUrl(document, true)} className={classes.headingLink}>{document.title}</a>
      </h1>
      
      <hr className={classes.headingHR}/>
      
      <EmailPostAuthors post={document}/><br/>
      <div className="postDate">
        <EmailPostDate post={document}/>
      </div><br/>
      {document.location && <div>
        {document.location}
      </div>}
      {document.contactInfo && <div>
        Contact: {document.contactInfo}
      </div>}
    </div>
    
    {document.contents && <EmailContentItemBody className="post-body" dangerouslySetInnerHTML={{
      __html: document.contents.html
    }} />}
    
    <a href={postGetPageUrl(document, true)}>Discuss</a><br/><br/>
    
    {reason && `You are receiving this email because ${reason}.`}
  </React.Fragment>);
}

const NewPostEmailComponent = registerComponent("NewPostEmail", NewPostEmail, {styles});

declare global {
  interface ComponentTypes {
    NewPostEmail: typeof NewPostEmailComponent
  }
}
