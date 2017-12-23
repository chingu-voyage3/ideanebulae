select idea.creator, idea.title, idea.type, idea.description,
			 review.reviewer, review.assigned_ts, review.updated_ts, review.comments
	from idea, review
	where idea.idea_slug = review.review_slug
	order by idea.creator, idea.title, idea.type
	;