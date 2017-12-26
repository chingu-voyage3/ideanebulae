-- These views must be manually defined in Postgres since Sequelize does not
-- support view creation.

-- View: public.review_status
-- This view results in a single row for each idea containing its status and
-- status date, as well as its most recent review creation date, and update
DROP VIEW public.review_status;

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
