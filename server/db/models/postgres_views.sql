-- These views must be manually defined in Postgres since Sequelize does not
-- support view creation.

-- View: public.idea_agreements
--
-- This view produces a list of all agreements for an idea
--
--DROP VIEW public.idea_agreements;
CREATE OR REPLACE VIEW public.idea_agreements AS
    SELECT agreements.id,
        profiles.username,
        agreements.idea_id,
        agreements.idea_title,
        agreements.idea_type,
        agreements.agreement,
        agreements.version
    FROM agreements,
         profiles
    WHERE agreements.idea_profile_id = profiles.id
    ORDER BY profiles.username;

ALTER TABLE public.idea_agreements
    OWNER TO postgres;

-- View: public.idea_documents
--
-- This view produces a list of all documents for an idea
--
--DROP VIEW public.idea_documents;

CREATE OR REPLACE VIEW public.idea_documents AS
 SELECT documents.id,
    profiles.username,
    documents.idea_id,
    documents.idea_title,
    documents.idea_type,
    documents.url,
    documents.description
   FROM documents,
    profiles
  WHERE documents.idea_profile_id = profiles.id
  ORDER BY profiles.username;

ALTER TABLE public.idea_documents
    OWNER TO postgres;

-- View: public.idea_reviews
--
-- This view produces a list of all reviews of an idea
--
--DROP VIEW public.idea_reviews;

CREATE OR REPLACE VIEW public.idea_reviews AS
 SELECT reviews.id,
    reviews.idea_id,
    ideaowners.username AS idea_creator,
    reviews.idea_title,
    reviews.idea_type,
    reviews.reviewer_id,
    reviewers.user_id AS reviewer,
    reviews.comments,
    reviews.created_at,
    reviews.updated_at
   FROM reviews,
    profiles ideaowners,
    profiles reviewers
  WHERE reviews.idea_profile_id = ideaowners.id AND reviews.reviewer_id = reviewers.id
  ORDER BY reviews.idea_id, reviews.id, reviewers.username;

ALTER TABLE public.idea_reviews
    OWNER TO postgres;



-- View: public.review_status
--
-- This view results in a single row for each idea containing its status and
-- status date, as well as its most recent review creation date, and update
--
--DROP VIEW public.review_status;

CREATE OR REPLACE VIEW public.review_status AS
 SELECT DISTINCT ON (all_reviews.idea_id) all_reviews.idea_id,
    dated_reviews.maxcreated,
    dated_reviews.maxupdated,
        CASE
            WHEN count(all_reviews.*) > 0 THEN 'Assigned'::text
            ELSE 'Created'::text
        END AS status,
        CASE
            WHEN dated_reviews.maxupdated = NULL::timestamp with time zone THEN dated_reviews.maxcreated
            ELSE dated_reviews.maxupdated
        END AS status_dt
   FROM reviews all_reviews,
    ( SELECT this_review.idea_id,
            max(this_review.created_at) AS maxcreated,
            max(this_review.updated_at) AS maxupdated
           FROM reviews this_review
          WHERE this_review.idea_id = this_review.idea_id
          GROUP BY this_review.idea_id) dated_reviews
  GROUP BY all_reviews.idea_id, dated_reviews.maxcreated, dated_reviews.maxupdated
  ORDER BY all_reviews.idea_id, dated_reviews.maxupdated DESC;

ALTER TABLE public.review_status
    OWNER TO postgres;
